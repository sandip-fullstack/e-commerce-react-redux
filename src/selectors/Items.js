import R from "ramda";


export const getItemsById = (state,id)=>R.prop(id,state.Item);

export const getTotalBasketPrice = state=>{
    const items = R.map(id=>getItemsById(state,id),state.Basket);
    let total = 0;
    return items.reduce((total,item)=>{
        return Math.round(total + item.price);
    }, total);
};

export const getTotalBasketCount = state=>{
    return state.Basket.length;
};

export const getCategories = (state)=>{
    return R.values(state.Categories);
};

export const getActiveCategoryId = ownProps=>{
    return R.path(["params","id"],ownProps);
};

export const getBasketItemsWithCount = (state)=>{
    const uniqueIds = R.uniq(state.Basket);
    const itemCount = (id)=>{
        return(
            R.compose(
                R.length,
                R.filter(basketId => R.equals(id,basketId))
            )(state.Basket)
        );
    };
    const itemWithCount = (item)=>{
        return R.assoc("count",itemCount(item.id),item);
    };
    const items = R.compose(
        R.map(itemWithCount),
        R.map(id => getItemsById(state,id))
    )(uniqueIds);
    return items;
};
