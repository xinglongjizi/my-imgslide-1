$(function(){

// 为img slider规定要运行的函数：
$('.slider-wrapper').each(function(){

	var group = $(this).find('.slider-group');		//获取slider的第三极父级的对象；
	var slider_arr = group.find('.slider');		//获取所有滑块div组成的数组对象
	var currentIndex = 0;		// 当前显示的是第一张div滑块,因此定义初始的index为0
	var timeout;		//定义setTimeout()......

	function advance(){
		timeout = setTimeout(function(){
			//如果当前显示的div滑块的index小于最后一个滑块div的index，即表示“后面”还有滑块div，可以“向后”滑动
			if( currentIndex < (slider_arr.length - 1) ){
				move(currentIndex + 1);
			}else{		//否则表示当前显示的div滑块的index等于最后一个滑块div的index，即到底了，要重新滑动第一个
				move(0);
			}
		},4000);
	}
	//4秒后要执行的move()函数：
	function move(newIndex){		//接受一个参数，即将要滑动到显示的滑块div的索引index
		// $group.is(':animated') 判断$group是不是正在处于jquery动画状态中
		// 当点击方向箭头或者小圆点触发move时，判断一下
		// 当group正处于动画状态、或者currentIndex === newIndex时，直接退出move函数什么都不做
    	if(group.is(':animated') || currentIndex === newIndex){
     		return;
    	}
		var sliderLeft,groupLeft;		//定义定位位置相关的变量；
		//判断滑动方向的
		if( newIndex > currentIndex ){		//表示“后面”还有滑块div，可向“后滑”
			sliderLeft = '100%';		//left:100% ,表示定位位置距离左边一个宽度，即跑到原来的右边了
			groupLeft = '-100%';		//group的animate()动画定位left:-100%; 即向左滑动
		}else{
			sliderLeft = '-100%';
			groupLeft = '100%';
		}
		//把将要滑动到的那个slider显示出来，且定位到sliderLeft的位置，而它的索引就是参数newIndex
		slider_arr.eq(newIndex).css({
			display:'block',
			left:sliderLeft,
		});
		//.group的动画：
		group.animate({
			left:groupLeft,
		},function(){
			//动画结束后，隐藏之前的那张滑块div
			slider_arr.eq(currentIndex).css({
				display:'none',
			});
			// 动画结束后，新的一张即将第二张slide也跑到父级group的位置
			slider_arr.eq(newIndex).css({
        		left: 0
      		});
      		group.css({
       			left: 0      //再将整个group弄到原来的位置
      		});
      		currentIndex = newIndex;    // 第二张的index 赋值给当前的index
      		clearTimeout(timeout);    //停止(取消) setTimeout() 设定的代码块的执行；
    		advance();       //循环执行，下一个4秒再次执行move()
		});
	}

	advance();

});






































































































});