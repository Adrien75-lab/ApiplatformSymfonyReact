import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from '../components/Pagination';
import moment from "moment";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELLED : "danger"
};

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}
const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
   
        // Récupération des invoices auprès de l'API

        const fetchInvoices = async () => {
            try {
            const data = await axios
            .get("http://localhost:8000/api/invoices")
            .then(response => response.data["hydra:member"]);
        setInvoices(data);
        } catch(error) {
            console.log(error.response);
        }
    };
    // Charger les invoices au chargement du composant
    useEffect(() => {
        fetchInvoices();
    }, []);
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    // Gestion de la suppression
    
    const handleDelete = async id => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            //
          await  axios.delete("http://localhhost:8000/" + id)
        } catch(error){
            console.log(error.response);
            setInvoices(originalInvoices);
        }
    }
   
    const itemsPerPage = 10;
    const paginatedInvoices = Pagination.getData(invoices,currentPage,itemsPerPage);
    return (
        <>
          <h1>Liste des factures</h1>
          <table className="table table-hover">
              <thead>
                  <tr>
                      <th>Numéro</th>
                      <th>Client</th>
                      <th className="text-center">Date d'envoi</th>
                      <th className="text-center">Statut</th>
                      <th className="text-center">Montant</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                      <td>{invoice.chrono}</td>
                      <td>
                          <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                      </td>
                      <td className="text-center">{formatDate(invoice.sentAt)}</td>
                      <td className="text-center">
                          <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                      </td>
                      <td className="text-center">{invoice.amount.toLocaleString()}</td>
                      <td>
                          <button className="btn-sm btn-primary mr-1">Editer</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                      </td>
                  </tr>)}
                  
              </tbody>

          </table>
          <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange}
          length={invoices.length} />
        </>

    );
};

export default InvoicesPage;