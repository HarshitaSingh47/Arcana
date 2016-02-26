/// <reference path="../tsd.d.ts" />
declare module app {
    interface IUser extends AngularFireObject {
        username: string;
    }
    
    interface IAppUser {
        uid: string;
        username: string;
    }
    
    interface ICard {
        cardName: string;
        cardType: string;
        rarity: string;
        instanceCost: number;
        maintenanceCost: number;
        genValue: number;
        burnValue: number;
        health: number;
        power: number;
        description: string;
        flavorText: string;
        label?: string;
    }
    
    interface IPack {
        packName: string;
        packType: string;
        cardCount: number;
        cards: ICard[];
        cost: number
    }
    
    interface ILoginController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        emailAddress: string;
        password: string;
        errorMessage: string;
        login(): void;
    }
    
    interface ILoginModel {
        email: string;
        password: string
    }
    
    interface IRegisterController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        emailAddress: string;
        username: string;
        password: string;
        errorMessage: string;
        
        register(): void;
    }
    
    interface IRegisterModel {
        email: string;
        password: string;
        username: string;
    }
    
    interface ICardsController {
        fbRef: Firebase;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IDeckBuilderController {
        fbRef: Firebase;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IDecksController {
        fbRef: Firebase;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IHomeController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
    }
    
    interface IHeaderController {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        fbUser: FirebaseAuthData;
        
        logout(): void;
    }
    
    interface IStoreController {
        fbRef: Firebase;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IAdminAddCardController {
        card: ICard;
        cardTypes: string[];
        rarities: string[];
        
        submit(): void;
        cancel(): void;
    }
    
    interface IAdminCardsController {
        fbRef: Firebase;
        cardType: string;
        cards: any;
        
        loadCards(): void;
        showCards(cardType: string): void;
        addCard(): void;
        editCard(cardId: string): void;
        deleteCard(cardId: string): void;
    }
    
    interface IAdminPacksController {
        fbRef: Firebase;
        
        loadPacks(): void;
        showPacks(packType: string): void;
        deletePack(packId: string): void;
    }
    
    interface IAdminEditCardController {
        card: AngularFireObject;
        rarities: string[];
        
        submit(): void;
        cancel(): void;
    }
    
    interface IAuthService {
        fbRef: Firebase;
        fbAuth: AngularFireAuth;
        
        login(model: ILoginModel): ng.IPromise<any>;
        logout(): void;
        register(userInfo): ng.IPromise<any>;
        waitForAuth(): ng.IPromise<any>;
        requireAuth(): ng.IPromise<any>;
        getAuth(): FirebaseAuthData;
    }
    
    interface ICardService {
        apiUrl: string;
        
        getCards(): ng.IPromise<any>;
        getCardsByType(cardType: string): ng.IPromise<any>;
        getCardById(cardId: string): ng.IPromise<any>;
        createCard(card: any): ng.IPromise<any>;
        updateCard(card: any): ng.IPromise<any>;
        deleteCard(cardId: string): ng.IPromise<any>;
    }
    
    interface IUserService {
        userApiUrl: string;
        userProfileApiUrl: string;
        
        createUser(user: any): ng.IPromise<any>;
        createUserProfile(user: any): ng.IPromise<any>;
        getUserProfileById(userId: string): ng.IPromise<any>;
    }
}