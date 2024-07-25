type RequestMethod = 'post' | 'get' | 'delete' | 'put';

type EndPoints = 'login' |
    'register' | 
    'editProfile' | 
    'deleteAccount' | 
    'allUsers' |
    'allFriends' | 
    'createChat' | 
    'allChats' | 
    'allStates' |
    'uploadState' | 
    'sendRequests' | 
    'existsChat' |
    'allRequest' |
    'acceptRequests' | 
    'sendMessage'

export {
    RequestMethod,
    EndPoints
}