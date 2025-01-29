'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
interface FilterProps {
  minRating?: number;
  minPrice?: number;
  category?: string; 
}

export default function SidebarFilterOptions({ minRating, minPrice, category }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'jewellery', label: 'Jewellery' },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
  ];
  const priceRanges = [
    { value: '0', label: 'Show All' },
    { value: '1', label: 'AED 1-50' },
    { value: '51', label: 'AED 51-100' },
    { value: '101', label: 'AED 101-150' },
    { value: '151', label: 'AED 151-200' },
    { value: '201', label: 'Above AED 200' },
  ];
  const ratingOptions = [4, 3, 2, 1];
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;//will return name and value of checkbox element,checked return boolean to represent checkbox is checked or not.

    // Create new search params based on the existing params
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    const updatedQueryString=params.toString();
    // Push the updated query string to the URL
    router.push(`/products?${updatedQueryString}`);
  };
  const handleClearFilters = () => {
    router.push('/products', {scroll: true});
  };

  return (
    <div>
      <h4 className="text-start">Filter by: <button  onClick={handleClearFilters} type="button" className="btn btn-link text-danger text-decoration-none ">Clear All</button></h4>
      <div className="mb-3">
        <h4>Category</h4>
        {categoryOptions.map((cat) => (
          <div key={cat.value} className="form-check"> 
            <label className="form-check-label">
              <input
              className=''
                type="radio"
                name="category"
                value={cat.value}
                onChange={handleCheckboxChange}
                checked={category === cat.value} 
              />
              {cat.label}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <h4>Price</h4>
        {priceRanges.map((range) => (
  <div key={range.value} className="form-check">
            <label className="form-check-label">
              <input
        type="radio"
        name="minPrice"
        value={range.value}
        onChange={handleCheckboxChange}
        checked={minPrice === parseInt(range.value)}
      />
      {range.label}
    </label>
  </div>
))}
</div>
      <div>
        <h4>Customer Reviews</h4>
        {ratingOptions.map((rating) => (
          <div key={rating} className="form-check">
            <label className="form-check-label">
              <input
                
                type="radio"
                name="minRating"
                value={rating}
                onChange={handleCheckboxChange}
                checked={minRating === rating}
              />
               {Array.from({ length: rating }).map((_, index) => (
<FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
))}
& Up
            </label>
          </div>
        ))}
      </div>
      
    </div>
  );
}

