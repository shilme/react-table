import React, {Component} from 'react'
import Paganation from './Paganation'
import '../../ReactTableStyle/table.css'
import ReactList from 'react-list';

class Table extends Component {
    constructor(props) {
        super(props)
        this.getData();
        this.getPagaSize = this.getPagaSize.bind(this);
        this.sortHandle = this.sortHandle.bind(this);
        this.state = {
            data: [],
            CountData:[]
        };

    }
    static pagenation(arr,size,pagesize){
        var newArr = [];
        var start = 0;
        var end = 0;
        arr.forEach(function(v,k){
            start = parseInt(k*size);
            end = parseInt(start + size);
            if(arr.length / size > k){
                newArr[k+1] = arr.slice(start,end);
            }
        });
        var res = {
            CountSize:arr.length,
            pageCount:parseInt(newArr.length-1),
            currentPage:parseInt(pagesize),
            pageSize:size,
            data:newArr[pagesize]
        }
        return res;
    }

    getData() {
        var that = this;
        var url = this.props.Harf;
        fetch(url).then(function (data) {
            return data.json();
        })
            .then(function (data) {
                if(!that.props.Pagenation){  /*未配置Pagenation参数 */
                        that.setState({
                            data: Table.pagenation(data,parseInt(data.length),1),
                            CountData:data
                        })
                    }else if(typeof parseInt(that.props.Pagenation)=="number"){
                        var CurrentSizes = that.props.CurrentSize ? that.props.CurrentSize:1;
                        that.setState({
                            data: Table.pagenation(data,parseInt(that.props.Pagenation),parseInt(CurrentSizes)),
                            CountData:data
                        })
                }
            })
            .catch(function (error) {
                return error;
            });
    }
    getPagaSize(rows,size){
        var Countdata = this.state.CountData;
        this.setState({
            data: Table.pagenation(Countdata,rows,parseInt(size))
        })
    }
    sortHandle(e){
        var oriArr = this.state.CountData;
        var value = e.target.innerHTML;

        var c = e.target.getAttribute("class");
        function less(t){
            return function(a,b){
                if(t){
                    e.target.parentNode.childNodes.forEach(function(item){
                        item.setAttribute('class','')
                    });
                    e.target.setAttribute("class",'along');
                    return a[value] < b[value] ? -1 : 1;
                }else{
                    e.target.parentNode.childNodes.forEach(function(item){
                        item.setAttribute('class','')
                    });
                    e.target.setAttribute("class",'rev');
                    return a[value] > b[value] ? -1 : 1;
                }
            }
        }
        var s = oriArr.sort(less(c==='rev'));
        this.setState({
            data: Table.pagenation(s,parseInt(this.props.Pagenation),1),
            CountData:s
        })
    }

    render() {
        var stateData = [];
        var tableHeaderData = [];
        if(this.props.Thead && this.state.data.data){
            tableHeaderData = this.props.Thead.split(",");
            stateData= this.state.data.data;
        }else if(this.state.data.data){
            stateData= this.state.data.data;
            tableHeaderData = Object.keys(stateData[0]);
        }
        console.log(tableHeaderData);
        console.log(stateData.length)
        var rt_pagenation = this.props.Pagenation !== undefined ?   <Paganation pageData = {this.state.data} onGetSize={this.getPagaSize}/>:"";
        return  <div className='rt-table'>
              <table>
                  <thead>
                      <tr>
                      {
                          tableHeaderData.map(
                              (name,index) => <th className='' onClick={this.sortHandle} key={index}>{name}</th>
                          )
                      }
                      </tr>
                  </thead>
                  </table>
                      {
                        <ReactList
                        itemRenderer={(index,key)=>{
                                          return   <table><tr key={key}>
                                                      {
                                                        tableHeaderData.map((item,key)=>{
                                                            return <td  key={key}>
                                                            {stateData[index][item]}
                                                            </td>
                                                        })
                                                      }
                                                  </tr>
                                                      </table>
                                      }}
                        length={stateData.length}
                        type='uniform'
                        />
                      }
              {rt_pagenation}
          </div>
    }
}
export default Table;