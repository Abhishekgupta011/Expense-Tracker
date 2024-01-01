import React from "react";
import { useSelector } from "react-redux";

const CsvContent = (props) => {
    //const products = useSelector((state) => state.expense.products);

    // Generate CSV content
    const csvContent = "id,description,amount,category\n" +
        props.products.map(expense => Object.values(expense).join(",")).join("\n");

    // Create Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'expenses.csv';

    // Trigger download
    link.click();
};

export default CsvContent;
