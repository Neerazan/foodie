import { CreateUserPrams, SignInParams } from "@/type"
import { Account, Avatars, Client, TablesDB, ID, Query } from "react-native-appwrite"

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: 'com.nirajan.foodie',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userDatabaseId: 'user',
}

export const client: Client = new Client()
client
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform)


export const account: Account = new Account(client)
export const databases = new TablesDB(client)
export const avatars = new Avatars(client)

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
  try {
    const newAccount = await account.create({
      email,
      password,
      userId: ID.unique(),
      name,
    })

    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userDatabaseId,
      rowId: ID.unique(),
      data: {
        accountId: newAccount.$id,
        name: name,
        email: email,
        avatar: avatarUrl,
      }
    });
  } catch (e) {
    throw new Error(e as string);
  }
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({email, password});
  } catch (e) {
    throw new Error(e as string);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listRows(
      {
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.userDatabaseId,
        queries: [Query.equal('accountId', currentAccount.$id)]
      }
    )

    if (!currentUser) throw Error;

    return currentUser.rows[0];
  } catch (e) {
    console.log(e);
    throw new Error(e as string);
  }
}