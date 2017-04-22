/**
 * Created by zhang on 2017/4/21.
 */
import {
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

const KEY = "key_favorite";
const KEY_FAVORITE = "key_favorite"
export default class FavoriteModel{
    /**
     * 根据语言获取所有收藏
     * @param language
     * @param onSuccess
     * @param onFailure
     */
    static getFavoriteByLanguage = (language,  onSuccess, onFailure) => {
        AsyncStorage.getItem(`${KEY}_${language}`)
            .then((favorites)=>{
                onSuccess(favorites)
            })
            .catch(onFailure)
    }
    /**
     * 添加收藏
     * @param language
     * @param favorite
     * @param onSuccess
     * @param onFailure
     */
    static save = (language, favorite, onSuccess, onFailure)=>{
        FavoriteModel.isExists(language, favorite,
            (flag)=>{
                if(!flag){
                    FavoriteModel._save(language, favorite, onSuccess, onFailure);
                }else{
                    FavoriteModel.remove(language, favorite, onSuccess, onFailure)
                }
            },
        onFailure)
    }
    static  _save = (language, favorite, onSuccess, onFailure)=>{
        FavoriteModel._saveLanguage(language, ()=>{
            console.log("_save language");
        }, (e)=>{
            console.log(e);
        });
        FavoriteModel.getFavoriteByLanguage(language,
            (favoritesjs)=>{
                var favorites = JSON.parse(favoritesjs);
                if(favorites===null || favorites === undefined) favorites = {language:language,items:[]};
                favorites.items.push(favorite);
                AsyncStorage.setItem(`${KEY}_${language}`, JSON.stringify(favorites))
                    .then(()=>{
                        onSuccess();
                        console.log("_save");
                    })
                    .catch(onFailure)
            },
            onFailure)
    }
    static  _saveAll = (language, favorites, onSuccess, onFailure)=>{
        AsyncStorage.setItem(`${KEY}_${language}`, JSON.stringify(favorites))
            .then(()=>{
                onSuccess()
                console.log("_saveAll");
            })
            .catch(onFailure)
    }
    /**
     * 移除收藏
     * @param language
     * @param favorite
     * @param onSuccess
     * @param onFailure
     */
    static remove=(language, favorite, onSuccess, onFailure)=>{
        // TODO 移除完某个语言下的所有项目将该语言也移除
        FavoriteModel.getFavoriteByLanguage(language,
            (favoritesjs)=>{
                var favorites = JSON.parse(favoritesjs);
                if(favorites===null || favorites === undefined) return;
                favorites.items.map((item,i)=>{
                    if(item.id === favorite.id){
                        favorites.items.splice(i, 1)
                    }
                });
                FavoriteModel._saveAll(language, favorites, onSuccess, onFailure);
                console.log("remove item");
            },
            onFailure)
    }

    static isExists=(language, src, onSuccess, onFailure)=>{
        FavoriteModel.getFavoriteByLanguage(language,
            (favoritesjs)=>{
                var favorites = JSON.parse(favoritesjs);
                if(favorites === null || favorites === undefined){
                    onSuccess(false);
                    return;
                }
                var exists = false;
                favorites.items.forEach(dest=>{
                    if(src.id === dest.id){
                        exists = true;
                    }
                })
                onSuccess(exists);
            },
            onFailure)
    }
    static getStarListByLanguage=(language, onSuccess, onFailure)=>{
        FavoriteModel.getFavoriteByLanguage(language,
            (favoritesjs)=>{
                var list = [];
                var favorites = JSON.parse(favoritesjs);
                if(favorites !== null && favorites !== undefined) {
                    favorites.items.forEach((item) => {
                        list.push(item.id)
                    })
                    onSuccess(list);
                }
            },
        onFailure)
    }

    static getFavoriteLanguages=(onSuccess, onFailure)=>{
        AsyncStorage.getItem('languages')
            .then((valuejs)=>{
                var value = JSON.parse(valuejs);
                onSuccess(value)
                console.log('languages >>> ' + value);
            })
            .catch(onFailure)
    }

    static _saveLanguage=(language, onSuccess, onFailure)=>{
        FavoriteModel.getFavoriteLanguages(
            (languages)=>{
                var exists = false;
                if(languages === null || languages === undefined){
                    languages = [];
                }else {
                    languages.forEach(
                        (item) => {
                            if (item === language) {
                                exists = true;
                            }
                        }
                    );
                }
                if(exists){
                    onFailure('language already exists')
                }else {
                    languages.push(language);
                    AsyncStorage.setItem('languages', JSON.stringify(languages))
                        .then(onSuccess)
                        .catch(onFailure);
                    DeviceEventEmitter.emit(KEY_FAVORITE, '');
                }
            },
            onFailure
        )
    }
}