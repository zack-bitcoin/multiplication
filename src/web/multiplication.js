DB = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];
size = 500;
rows = 10;
Width = size/rows
var c = document.getElementById("myCanvas");
ctx = c.getContext("2d");
ctx.fillStyle = "#00F0F0";
ctx.fillRect(0,0,size,size);
var elem = document.getElementById('myCanvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop;

function draw() {
    ctx.fillStyle = "#00F0F0";
    ctx.fillRect(0,0,size,size);
    ctx.fillStyle = "#F0F000";
    ctx.fillRect(0,0,row * Width,col * Width);
    draw_grid(0, rows, size, ctx);
    draw_digits(DB, ctx);
};

function draw_grid(I, Rows, size, ctx) {
    if(I > Rows) {
	return 0;
    } else {
	var X = I * Width;
	//console.log(X);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,X-1,size,2);
	ctx.fillRect(X-1,0,2,size);
	return draw_grid(I+1, Rows, size, ctx);
    }
};

draw_grid(0, rows,size, ctx);
ctx.font = "20px Arial";

function draw_digits(DB, ctx) {
    for(i=0; i < rows; i++){
	for(j=0; j < rows; j++){
	    var L = DB[i][j];
	    ctx.fillText(L, Width * i + (Width / 6), Width * j + (Width / 2));
	}
    }
}

function click(event) {
    var x = event.pageX - elemLeft,
	y = event.pageY - elemTop;
    row = Math.floor(x * rows / size) + 1;
    col = Math.floor(y * rows / size) + 1;
    console.log(row);
    console.log(col);
    ctx.fillStyle = "#00F0F0";
    ctx.fillRect(0,0,size,size);
    ctx.fillStyle = "#F0F000";
    ctx.fillRect(0,0,row * Width,col * Width);
    draw();
    //draw_grid(0, rows,size, ctx);
    //draw_digits(DB, ctx);
};

c.addEventListener('click', click, false);


function store_func(next, row, col, DB) {
    var R = DB[row - 1].slice();
    R[col - 1] = next;
    DB[row - 1] = R;
};

function delete_char(row, col, DB) {
    var current = DB[row - 1][col - 1];
    var next = Math.floor(current / 10);
    DB = store_func(next, row, col, DB);
};
function type_char(row, col, I, DB) {
    var current = DB[row - 1][col - 1];
    var next = (current * 10 + I) % 1000;
    DB = store_func(next, row, col, DB);
};
document.onkeypress = function(e) {
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    var S = String.fromCharCode(charCode);
    var I = parseInt(S);
    if(I){
	type_char(row, col, I, DB);
    };
    if(charCode==48){
	type_char(row, col, 0, DB);
    };
    if(charCode==8){
	delete_char(row, col, DB);
    };
    draw();
    //draw_grid(0, rows,size, ctx);
    //draw_digits(DB, ctx);
};
