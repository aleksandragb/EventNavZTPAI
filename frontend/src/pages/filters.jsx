import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FilterBar() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <div className="category-cont" style={{ margin: '10px' }}>
      <Slider {...settings}>
        <div className="category-item">Sports</div>
        <div className="category-item">Music</div>
        <div className="category-item">Food</div>
        <div className="category-item">Art</div>
        <div className="category-item">Tech</div>
        <div className="category-item">Sports</div>
        <div className="category-item">Music</div>
        <div className="category-item">Food</div>
        <div className="category-item">Art</div>
        <div className="category-item">Tech</div>
        <div className="category-item">Sports</div>
        <div className="category-item">Music</div>
        <div className="category-item">Food</div>
        <div className="category-item">Art</div>
        <div className="category-item">Tech</div>
        {/* Dodaj więcej kategorii według potrzeb */}
      </Slider>
    </div>
  );
}

export default FilterBar;
