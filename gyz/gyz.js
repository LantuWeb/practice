//把一个 prop 从父组件 Board “传递”给子组件 Square。

// class Square extends React.Component {//渲染单独的button
//   //初始化state
//   constructor(props){
//     super(props);
//     this.state = {
//       value:null,
//     };
//   }
//   render() {
//     return (
//       <button
//         className="square" 
//         onClick={()=> this.props.onClick()}>
//         {this.props.value} 
//       </button>
//     );
//   }//在 React 应用中，数据通过 props 的传递，从父组件流向子组件。
// }
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {//渲染9个方块
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';//轮流落子的效果
    this.setState(
      { squares: squares,
        xIsNext: !this.state.xIsNext,
      }
    );
  }

  //Square 的点击事件监听函数
  renderSquare(i) {
    return <Square value = {this.state.squares[i]} 
             onClick = {()=>this.handleClick(i)}/>;//传递一个名为 value 的 prop 到 Square 当中, 每个 Square 都能接收到一个 value prop
  }

  render() {
    //判断胜者
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner){
      status = 'Winner: ' + winner;
    }
    else{
       status = 'Next player:  ' + (this.state.xIsNext ? 'X' : 'O');//显示下一个落子的人
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {//渲染棋盘
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}