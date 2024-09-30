export interface FriendList{
    username: string,
    isAcceptRequest: false;
    isAddFriendRequest: false;
}

export interface Friends{
    sender: string,
    receiver: string,
    message: string,
}

export interface User{
    id: string,
    username: string,
    password: string,
    friends: Friends[],
    friendList: FriendList[]
}