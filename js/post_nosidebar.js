/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Grid


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var menuActive = false;
	var menu = $('.menu');
	var burger = $('.hamburger');

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initGrid();
	const array = ['one','two','three'];
	array.forEach((item)=>initSlider(item));

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			if($('.hamburger').length)
			{
				burger.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();

						$(document).one('click', function cls(e)
						{
							if($(e.target).hasClass('menu_mm'))
							{
								$(document).one('click', cls);
							}
							else
							{
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	4. Init Grid

	*/

	function initGrid()
	{
		setTimeout(function()
		{
			$('.grid').masonry(
			{
				itemSelector:'.grid-item',
				columnWidth: '.card_small_with_image',
				gutter:30
			});
		}, 500);
			
	}
	
	/*Custom Owl*/
	/*

	4. Init Top Slider

	*/
	
	function initSlider(item)
	{
		if($(`.sidebar_slider_${item}`).length)
		{
			var topSlider = $(`.sidebar_slider_${item}`);
			
			topSlider.owlCarousel(
				{
					items:1,
					loop:true,
					autoplay:false,
					smartSpeed:1200,
					dots:true,
					dotsContainer:`.custom_dots_${item}`,
					nav:false,
					mouseDrag:true,
					animateOut: 'fadeOut'
				});
			
			if($(`.custom_prev_${item}`).length)
			{
				$(`.custom_prev_${item}`).on('click', function()
				{
					topSlider.trigger('prev.owl.carousel');
				});
			}
			
			if($(`.custom_next_${item}`).length)
			{
				$(`.custom_next_${item}`).on('click', function()
				{
					topSlider.trigger('next.owl.carousel');
				});
			}
			
			/* Custom dots events */
			if($(`.custom_dot_${item}`).length)
			{
				$(`.custom_dot_${item}`).on('click', function(ev)
				{
					var dot = $(ev.target);
					$(`.custom_dot_${item}`).removeClass('active');
					dot.addClass('active');
					topSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
				});
			}
			
			/* Change active class for dots when slide changes by nav or touch */
			topSlider.on('changed.owl.carousel', function(event)
			{
				$(`.custom_dot_${item}`).removeClass('active');
				$(`.custom_dots_${item} li`).eq(event.page.index).addClass('active');
			});
		}
	}

});