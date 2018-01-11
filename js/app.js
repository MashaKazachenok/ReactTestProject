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

var TestInput = React.createClass({

onBtnClickHandler: function() {
alert(ReactDOM.findDOMNode(this.refs.myTestInput).value)
},
render: function() {
return (
<div>
<input
className='testInput'
defaultValue=''
onChange={this.onChangeHandler}
placeholder='input value'
ref='myTestInput'
/>
<button onClick={this.onBtnClickHandler}>Show alert</button>
</div>
);
}
});

var App = React.createClass({
render: function() {
return (
<div className="app">
<h3>News</h3>
<TestInput />
<News data={myNews} />

</div>
);
}
});
ReactDOM.render(
<App />,
document.getElementById('root')
);