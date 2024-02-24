import React, { useState } from 'react';

const Problem1 = () => {
  const [formData, setFormData] = useState([]);
  const [show, setShow] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameInput = e.target[0].value;
    const statusInput = e.target[1].value;

    // Add new data to the formData array
    setFormData((prevData) => [...prevData, { name: nameInput, status: statusInput }]);
  };

  const handleClick = (val) => {
    setShow(val);
  };

  // Filter and sort data based on the selected option
  const filteredData = formData.filter((item) => {
    if (show === 'all') return true;
    return item.status.toLowerCase() === show;
  });

  // Sort data: Active first, Completed next, and others last
  const sortedData = [...filteredData].sort((a, b) => {
    const order = { active: 1, completed: 2 };
    return order[a.status.toLowerCase()] - order[b.status.toLowerCase()];
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Status" />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>
                All
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>
                Active
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;