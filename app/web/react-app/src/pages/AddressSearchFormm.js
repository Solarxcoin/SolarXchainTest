import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchSVG from '../images/svg/magnifying-glass.svg'
// import AddressSearchForm from './AddressSearchForm';

const AddressSearchFormm = () => {
  const [address, setAddress] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/searchaddress/${address}/coin-balance`);
  };

  return (
    <div className="s1">
      <div className="mt-5 mb-5">
        <p className="ms-4 mb-0 s1-ps text-white">Start from here</p>
        <h3 className="mb-3 ms-4 text-white">SolarX Chain Explorer</h3>
          <div className="col-md-6 col-12">
            <div className="search-container d-flex">
              <label htmlFor="walletAddress" className="btn btnFilter px-4 py-2 d-none d-sm-block">
                Search&nbsp;Address
              </label>
                <input
                  type="text"
                  id="walletAddress"
                  className="form-control search w-100 ps-3 ps-sm-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
        <button type="button" onClick={handleSearch} className="btn btnSearch px-4 py-2">
          <img src={SearchSVG} alt="Search" />
        </button>
            </div>
          </div>
      </div>
    </div>
    // <div className="s1 d-flex justify-content-center">
    // <form onSubmit={handleSubmit} className="mt-5 mb-5">
    //   <p class="ms-4 mb-0 s1-ps text-white">Start from here</p>
    //   <h3 class="mb-3 ms-4 text-white">SolarX Chain Explorer</h3>
    //   <div className="col-md-6 col-12">
    //     <div className="search-container d-flex">
    //       <a disabled className="btn btnFilter px-4 py-2 d-none d-sm-block">Search&nbsp;Address</a>
    //       <input
    //         type="text"
    //         id="walletAddress"
    //         className="form-control search w-100 ps-3 ps-sm-2"
    //         value={address}
    //         onChange={(e) => setAddress(e.target.value)}
    //       />
    //     <button type="submit" className="btn btnSearch px-4 py-2"><img src={SearchSVG} alt="Search" /></button>
    //     </div>
    //   </div>
      
    // </form>
    // </div>
  );
};

export default AddressSearchFormm;
