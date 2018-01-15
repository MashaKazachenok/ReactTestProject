var myNews = [
{
author: 'Sasha Petrov',
text: 'Yesterday evening, when the Princess came home...',
bigText: 'and noticed a strange gift in her room.'
},
{
author: 'Just Vasya',
text: 'La-la-la',
bigText: 'His soul sings.'
},
{
author: 'Guest',
text: 'Absolutely free. Download...',
bigText: 'Actually paid.'
}
];

window.ee = new EventEmitter();

var Article = React.createClass({
propTypes: {
data: React.PropTypes.shape({
author: React.PropTypes.string.isRequired,
text: React.PropTypes.string.isRequired,
bigText: React.PropTypes.string.isRequired
})
},
getInitialState: function() {
return {
visible: false
};
},
readmoreClick: function(e) {
e.preventDefault();
this.setState({visible: true});
},
render: function() {
var data = this.props.data;
var visible = this.state.visible;

return (
<div className="article">
<p className="newsAuthor">{data.author}:</p>
<p className="newsText">{data.text}</p>
<a href="#"
	 onClick={this.readmoreClick}
	 className={'newsReadMore ' + (visible ? 'none': '')}>
	 Read more.. 
 </a>
<p className={'newsBigText ' + (visible ? '': 'none')}>{data.bigText}</p>
</div>
);
}
});

var News = React.createClass({
propTypes: {
data: React.PropTypes.array.isRequired
},
render: function() {
var data = this.props.data;
var newsTemplate;
if (data.length > 0) {
newsTemplate = data.map(function(item, index) {
return (
<div key={index}>
<Article data={item} />
</div>
)
})
} else {
newsTemplate = <p>Unfortunately there is no news</p>
} 
return (
<div className="news">
{newsTemplate}
<strong className={'newsCount ' + (data.length > 0 ? '':'none') }>Total news: {data.length}</strong>
</div>
);
}
});

var Add = React.createClass({
getInitialState: function() {
return {
agreeNotChecked: true,
authorIsEmpty: true,
textIsEmpty: true
};
},
componentDidMount: function() {
ReactDOM.findDOMNode(this.refs.author).focus();
},
onBtnClickHandler: function(e) {
e.preventDefault();
var author = ReactDOM.findDOMNode(this.refs.author).value;
var textEl = ReactDOM.findDOMNode(this.refs.text);
var text = textEl.value;

var item = [{
author: author,
text: text,
bigText: '...'
}];

window.ee.emit('News.add', item);

textEl.value = '';
this.setState({textIsEmpty: true});

},
onCheckRuleClick: function(e) {
this.setState({agreeNotChecked: !this.state.agreeNotChecked});
},
onFieldChange: function(fieldName, e) {
if (e.target.value.trim().length > 0) {
this.setState({[''+fieldName]:false})
} else {
this.setState({[''+fieldName]:true})
}
},
render: function() {
return (
<form className='add cf'>
<input
type='text'
className='addAuthor'
defaultValue=''
placeholder='Your name'
onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
ref='author'
/>
<textarea
className='addText'
defaultValue=''
placeholder='Text your news'
onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
ref='text'
></textarea>
<label className='addCheckrule'>
<input type='checkbox' defaultChecked={false} ref='checkrule' onChange={this.onCheckRuleClick}/>I agree with rules.
</label>
<button
className='addBtn'
onClick={this.onBtnClickHandler}
ref='alertButton'
disabled={this.state.agreeNotChecked || this.state.authorIsEmpty || this.state.textIsEmpty}
>
Add news
</button>
</form>
);
}
});

var App = React.createClass({
getInitialState: function() {
return {
news: myNews
};
},
componentDidMount: function() {
var self = this;
window.ee.addListener('News.add', function(item) {
var nextNews = item.concat(self.state.news);
self.setState({news: nextNews});
});
},
componentWillUnmount: function() {

},
render: function() {
return (
<div className="app">
<h3>News</h3>
<Add />
<News data={this.state.news} />

</div>
);
}
});
ReactDOM.render(
<App />,
document.getElementById('root')
);