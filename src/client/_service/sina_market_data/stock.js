import React from 'react';
import {graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { StockMarketDataFetch } from './api';

class StockMarketDataFetchAgent extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        setTimeout( () => {
            this.fetchData();
            this.interval = setInterval(this.fetchData, parseInt(this.props.interval));     
          }, Math.floor(Math.random() * 5000));       
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    fetchData() {
       // console.log('Fetching...',this.props.interval)
        StockMarketDataFetch(this.props.stocklist).then( 
            data => {
                //console.log("-FetchResult:",data);
                this.props.update_stock({
                    variables: {
                        data
                    }
                });
            });   
    }
    render(){        
        return (
            <div />
        );
    } 
}
const POST_MUTATION = gql`
    mutation PostMutation($data: [StockType_INPUT!]!){
        UPDATE_STOCK_DATA(stock: $data) 
        {
            stockname
            currentdate
            currenttime
        }
    }
`;

export default graphql(POST_MUTATION,{name: 'update_stock'})(StockMarketDataFetchAgent);