import {Inject, Injectable} from 'angular2/core';
import {Storage, SqlStorage} from 'ionic-angular';

@Injectable()
export class LocalStorageService {
    private static instance: LocalStorageService;
    private static storage: Storage;

    constructor() {
        if (!LocalStorageService.storage) {
            LocalStorageService.storage = new Storage(SqlStorage, {existingDatabase: true});
        }
        return LocalStorageService.instance;
    }

    public static get = (key: string) => {
        return new Promise((resolve, reject) => {
            LocalStorageService.storage.get(key).then((value) => {
                resolve(value);
            });
        });
    };

    public static set = (key: string, value: string) => {
        return new Promise((resolve, reject) => {
            LocalStorageService.storage.set(key, value).then(() => {
                resolve();
            });
        });
    };
}
