// src/components/DocumentCard.tsx
import React from "react";
import styles from "./DocumentCard.module.css";
import {Document} from "../types";

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <a href={document.fileUrl} target="_blank" rel="noreferrer">
          {document.documentType}
        </a>
      </div>
      <div className={styles.cardBody}>
        <div>
          <span className={styles.label}>Act Number: </span>
          {document.actNumber}
        </div>
        <div>
          <span className={styles.label}>Act Date: </span>
          {document.actDate}
        </div>
        <div>
          <span className={styles.label}>Case Number: </span>
          {document.caseNumber}
        </div>
        <div>
          <span className={styles.label}>Case Year: </span>
          {document.caseYear}
        </div>
        <div>
          <span className={styles.label}>Procedure: </span>
          {document.procedure}
        </div>
        <div>
          <span className={styles.label}>Court: </span>
          {document.court}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
