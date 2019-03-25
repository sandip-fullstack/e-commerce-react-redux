import React from "react";
import {connect} from "react-redux";

import {fetchItems,fetchCategories, addItemToBasket} from "../actions/Items";

class Items extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        this.props.fetchItems();
        this.props.fetchCategories();
    }

    componentWillReceiveProps(nextProps) {
        let itemsFiltered = nextProps.activeId ?
            nextProps.items.filter((x) => x.categoryId === nextProps.activeId)
            : nextProps.items;
        this.setState ({
            items: itemsFiltered
        })
    }

    renderItem = (item,index)=>{
        const {addItemToBasket} = this.props;
        return (
            <div className="col-xs-6 col-sm-4 col-lg-4 col-md-4 book-list" key={index}>
                    <div className="thumbnail image-class" style={{backgroundImage: `url(${item.image})`,
                opacity: item.quantity <= 0 ? 0.5 : 1}}>
                    <div className="item-button">
                        <button className="btn btn-primary"
                                onClick={()=>addItemToBasket(item.id)} disabled={item.quantity <=0}>
                            Add to cart
                        </button>
                    </div>
                </div>
                <div className="caption">
                    <b>
                        {item.name}
                    </b>
                    <div className="price-font">
                        £{item.price}
                    </div>
                    <div>
                        {
                            item.quantity <=0 ? <div className="red-text">Product Out of Stock</div> : 
                            `Quantity: ${item.quantity}`
                        }
                    </div>
                </div>
                
            </div>
        );
    };

    render(){
        const {items} = this.state;
        return(
        <div>
            <div className="books row">
                {items.map((item,index)=>{
                    return this.renderItem(item,index);
                })}
            </div>
        </div>            
    )};
};

const mapDispatchToProps = (dispatch)=>({
    fetchItems: ()=>dispatch(fetchItems()),
    addItemToBasket: (id)=>dispatch(addItemToBasket(id)),
    fetchCategories: ()=>dispatch(fetchCategories())
});

const mapStateToProps = (state, ownProps) => ({
    items: state.Item,
    activeId: ownProps.params.id
});

export default connect(mapStateToProps,mapDispatchToProps)(Items);