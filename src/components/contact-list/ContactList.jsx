import React, { useEffect } from 'react';

import PerfectScrollbar from "react-perfect-scrollbar";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getUserContacts } from "../contact-list/actions/contact-list.actions";

import ContactCard from "./contact-card/ContactCard";

import "./contact-list.scss";

const ContactList = (props) => {

    useEffect(() => {
        getUserContacts();
    }, [])

    const getUserContacts = () => {
        props.getUserContacts();
    }

    const handleContactSearch = (email) => {
        props.setSearchQuery(`from:${email}`);  
        performSearch();
      }
    
      const performSearch = () => {
        const searchParams = {}
        if (!props.searchQuery || props.searchQuery === "") {
          searchParams.labelIds = ["INBOX"];
        }
        props.getLabelMessages({...searchParams})
      };

    return (
        <PerfectScrollbar className="contact-list-container">
            {props.contactsResult.contacts.map(contact => {
                return (
                    <ContactCard
                        key={contact.etag}
                        contact={contact}
                        handleContactSearch={handleContactSearch}
                    />
                )
            })}
        </PerfectScrollbar>
    );
}


const mapStateToProps = state => ({
    contactsResult: state.contactsResult
  });
  
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { getUserContacts },
        dispatch
    );
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactList);