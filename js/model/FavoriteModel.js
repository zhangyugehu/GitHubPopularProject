/**
 * Created by zhang on 2017/4/21.
 */
import {
    AsyncStorage,
} from 'react-native';

const KEY = "key_favorite";
export default class FavoriteModel{
    /**
     * 根据语言获取所有收藏
     * @param language
     * @param onSuccess
     * @param onFailure
     */
    static getFavoriteByLanguage = (language,  onSuccess, onFailure) => {
        AsyncStorage.getItem(KEY)
            .then((favorites)=>{
                onSuccess(favorites)
            })
            .catch((e)=>{
                onFailure(e);
            })
    }
    /**
     * 添加收藏
     * @param language
     * @param favorite
     * @param onSuccess
     * @param onFailure
     */
    static save = (language, favorite, onSuccess, onFailure)=>{
        FavoriteModel.getFavoriteByLanguage(language, (favorites)=>{
            if(favorites===null || favorites === undefined) favorites = [];
            favorites.push(favorite);
            AsyncStorage.setItem(KEY, favorites)
                .then(()=>{
                    onSuccess()
                })
                .catch((e)=>{
                    onFailure(e);
                })
        }, (e)=>{onFailure(e)})
    }
    /**
     * 移除收藏
     * @param language
     * @param favorite
     * @param onSuccess
     * @param onFailure
     */
    static remove=(language, favorite, onSuccess, onFailure)=>{
        FavoriteModel.getFavoriteByLanguage(language,
            (favorites)=>{
                favorites.remove(favorite);
                onSuccess();
            },
            (e)=>{
                onFailure(e);
            })
    }
}