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
        creatureType: string;
        rarity: string;
        instanceCost: number;
        maintenanceCost: number;
        genValue: number;
        burnValue: number;
        health: number;
        power: number;
        description: string;
        flavorText: string;
    }
    
    interface ILoginController {
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
        fbRef: Firebase;
        card: ICard;
        cardTypes: string[];
        creatureTypes: string[];
        rarities: string[];
        
        submit(): void;
        cancel(): void;
    }
    
    interface IAdminCardsController {
        fbRef: Firebase;
        cardType: string;
        
        loadCards(): void;
        showCards(cardType: string): void;
        addCard(): void;
        editCard(cardId: string): void;
        deleteCard(cardId: string): void;
        activate(): void;
    }
    
    interface IAdminEditCardController {
        card: ICard;
        cardType: string;
        title: string;
        creatureTypes: string[];
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
}