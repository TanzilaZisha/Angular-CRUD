export class User{
    constructor( public userId: string, 
                 public password: string,
                 private _token: string,
                 private _tokenExpires: Date){

    }
    get token(){
        if( this._tokenExpires < new Date()){
            return null;
        }
        return this._token
    }
}