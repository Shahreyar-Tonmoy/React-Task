
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://contact.mediusware.com/api/";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [contactsA, setContactsA] = useState([]);
  const [contactsB, setContactsB] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);

  useEffect(() => {
    const fetchData = async (countryName) => {
      try {
        const response = await axios.get(`${API_BASE_URL}contacts/`, {
          params: {
            country: countryName,
          },
        });

        return response.data.results;
      } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
      }
    };

    const loadContacts = async () => {
      const allContacts = await fetchData("");
      setContactsA(allContacts);

      const usContact = await fetchData("United States");
      const usContacts = usContact.filter((data) => data.country.name === "United States");
      setContactsB(usContacts);
    };

    loadContacts();
  }, []);

  useEffect(() => {
    // Check the URL path and open the corresponding modal
    const path = window.location.pathname;
    if (path === "/modal-a") {
      openModalA();
    } else if (path === "/modal-b") {
      openModalB();
    }
  }, []);


  const openModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    window.history.pushState({}, "", "/modal-a");
  };

  const openModalB = () => {
    setShowModalB(true);
    setShowModalA(false);
    setShowModalC(false);
    window.history.pushState({}, "", "/modal-b");
  };

  const openModalC = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  const closeModal = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

  const toggleOnlyEven = () => {
    setOnlyEven(!onlyEven);
  };

  const filteredContactsB = onlyEven
    ? contactsB.filter((contact) => contact.id % 2 === 0)
    : contactsB;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>

          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>

        {/* Modal A */}
        <div
          className={`modal fade ${showModalA ? "show" : ""}`}
          style={{ display: showModalA ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "#46139f", color: "white" }}
              >
                <h5 className="modal-title">Modal A</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                  style={{ color: "white" }}
                ></button>
              </div>
              <div className="modal-body">
                <ul>
                  {contactsA.map((contact) => (
                    <li
                      key={contact.id}
                      onClick={() => openModalC(contact)}
                      style={{ cursor: "pointer" }}
                    >
                      {contact.phone}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="modal-footer"
                style={{ backgroundColor: "#46139f" }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal B */}
        <div
          className={`modal fade ${showModalB ? "show" : ""}`}
          style={{ display: showModalB ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "#ff7f50", color: "white" }}
              >
                <h5 className="modal-title">Modal B</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                  style={{ color: "white" }}
                ></button>
              </div>
              <div className="modal-body">
                <ul>
                  {filteredContactsB.map((contact) => (
                    <li
                      key={contact.id}
                      onClick={() => openModalC(contact)}
                      style={{ cursor: "pointer" }}
                    >
                      {contact.phone}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="modal-footer"
                style={{ backgroundColor: "#ff7f50" }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleOnlyEven}
                >
                  Only even
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal C */}
        <div
          className={`modal fade ${showModalC ? "show" : ""}`}
          style={{ display: showModalC ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div
              className="modal-content"
              style={{ border: "2px solid #46139f" }}
            >
              <div
                className="modal-header"
                style={{ backgroundColor: "#46139f", color: "white" }}
              >
                <h5 className="modal-title">Modal C</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                  style={{ color: "white" }}
                ></button>
              </div>
              <div className="modal-body">
                {selectedContact && (
                  <div>
                    <h5>Contact Details</h5>
                    <p>ID: {selectedContact.id}</p>
                    <p>Phone: {selectedContact.phone}</p>
                    <p>Country: {selectedContact.country.name}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
