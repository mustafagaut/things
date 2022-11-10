
import {ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    
     CLEAR_ERRORS} from '../constants/productConstants'



//GET ALL PRODUCT REDUCER

export const productsReducer =(state={products:[]},actions)=>{


    switch(actions.type){
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_FAIL:
            case ADMIN_PRODUCT_FAIL:
            return {
                loading:false,
                error:actions.payload
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:actions.payload.data.products,
                productCount:actions.payload.data.productCount,
                resultPerPage:actions.payload.data.resultPerPage,
                filteredProductsCount:actions.payload.data.filteredProductsCount

            }
            case ADMIN_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:actions.payload.data.products,
                 }
            case CLEAR_ERRORS:
            return {
                ...state,
                error:null

            }
        default :
            return state;
            

    }


};





//GET SINGLE PRODUCT 
export const productDetailReducer =(state={product:{}},actions)=>{


    switch(actions.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
                ...state
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error:actions.payload
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:actions.payload.data.product,
              }
            case CLEAR_ERRORS:
            return {
                ...state,
                error:null

            }
        default :
            return state;
            

    }


};

export const newReviewReducer =(state={ },actions)=>{


    switch(actions.type){
        case NEW_REVIEW_REQUEST:
            return {
                loading:true,
                ...state
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:actions.payload
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading:false,
                success:actions.payload.data.success,
              }
              case NEW_REVIEW_RESET:
            return {
                ...state,
                success:false,
            }
            case CLEAR_ERRORS:
            return {
                ...state,
                error:null

            }
        default :
            return state;
            

    }


};


export const newProductReducer =(state={product:{} },actions)=>{


    switch(actions.type){
        case NEW_PRODUCT_REQUEST:
            return {
                loading:true,
                ...state
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:actions.payload
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading:false,
                success:actions.payload.success,
                product:actions.payload.product
              }
              case NEW_PRODUCT_RESET:
            return {
                ...state,
                success:false,
            }
            case CLEAR_ERRORS:
            return {
                ...state,
                error:null

            }
        default :
            return state;
            

    }


};




export const productReducer =(state={},actions)=>{


    switch(actions.type){
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                loading:true,
                ...state
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:actions.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:actions.payload,
                
              }
              case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:actions.payload,
                }
              case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted:false,
            }
            case UPDATE_PRODUCT_RESET:
                return {
                    ...state,
                    isUpdated:false,
                }
            case CLEAR_ERRORS:
            return {
                ...state,
                error:null

            }
        default :
            return state;
            

    }


};

