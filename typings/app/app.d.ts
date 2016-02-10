/// <reference path="../tsd.d.ts" />
declare module app {
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
    
    interface IRegisterController {
        emailAddress: string;
        username: string;
        password: string;
        errorMessage: string;
        
        register(): void;
    }
    
    interface ICardsController {
        fbRef: FirebaseStatic;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IDeckBuilderController {
        fbRef: FirebaseStatic;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IDecksController {
        fbRef: FirebaseStatic;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IHomeController {
        fbRef: FirebaseStatic;
        fbAuth: AngularFireAuth;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IHeaderController {
        fbRef: FirebaseStatic;
        currentUser: IAppUser;
        
        logout(): void;
    }
    
    interface IStoreController {
        fbRef: FirebaseStatic;
        currentUser: IAppUser;
        
        activate(): void;
    }
    
    interface IAdminAddCardController {
        fbRef: FirebaseStatic;
        card: ICard;
        cardTypes: string[];
        creatureTypes: string[];
        rarities: string[];
        
        submit(): void;
        cancel(): void;
    }
    
    interface IAdminCardsController {
        fbRef: FirebaseStatic;
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
}