import React,{Component} from 'react'
import '../../ReactTableStyle/pagenation.css'

class Paganation extends Component{
    constructor(){
        super()
        this.changeHandle = this.changeHandle.bind(this);
        this.controlPageSize = this.controlPageSize.bind(this);
    }
    changeHandle(e){
        if(e.target.name ==='rows'){
            this.refs.pagasize.value = 1;
        }
        this.props.onGetSize(parseInt(this.refs.rows.value),this.refs.pagasize.value);
    }
    controlPageSize(e){
        var pageDatas = this.props.pageData;
        var type = e.target.className;
        if(type==="lower"){
            if(parseInt(this.refs.pagasize.value)===1){
                return false;
            }
            this.refs.pagasize.value = parseInt(this.refs.pagasize.value) - 1;
            this.props.onGetSize(parseInt(this.refs.rows.value), parseInt(this.refs.pagasize.value));
        }else if(type==="add"){
            if(parseInt(this.refs.pagasize.value)===pageDatas.pageCount){
                return false;
            }
            this.refs.pagasize.value = parseInt(this.refs.pagasize.value) + 1;
            this.props.onGetSize(parseInt(this.refs.rows.value),parseInt(this.refs.pagasize.value));
        }
    }
    render(){

        var pageDatas = this.props.pageData;

        return <div className='rt-pagenation'>
            <div className="-previous">
                <button className="lower" onClick={this.controlPageSize}>{"<"}</button>
            </div>
            <div className="-center">
                <span>Page</span>
                <input ref='pagasize' value={parseInt(pageDatas.currentPage)} onChange={this.changeHandle} type="number"/>
                <span>&nbsp;of&nbsp;{pageDatas.pageCount}</span>
                <select ref="rows" name="rows" id="" value={pageDatas.pageSize} onChange={this.changeHandle}>
                    <option value="5">5&nbsp;rows</option>
                    <option value="10">10&nbsp;rows</option>
                    <option value="10000">10000&nbsp;rows</option>
                </select>

            </div>
            <div className="-next">
                <button className="add" onClick={this.controlPageSize}>{">"}</button>
            </div>
        </div>
    }
}
export default Paganation;
