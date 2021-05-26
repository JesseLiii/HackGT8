import { useState } from 'react';
import { Modal, Alert, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import SiteCatalogItemForm from './SiteCatalogItemForm';
import Image from 'next/image';

export default function SiteCatalogTable({ catalog, siteId, fetchUpdatedCatalog }) {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState();

  const onDismiss = () => setVisible(false);
  const [showAlert, setShowAlert] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = (item) => {
    setItem(item);
    setModal(!modal);
  };

  const showAlertMessage = ({ status, message }) => {
    toggle(null);
    setShowAlert({ status, message });
    setVisible(true);
    fetchUpdatedCatalog();
  };
  return (
    <div className="bg-white">
      <Modal isOpen={modal} toggle={() => toggle(null)}>
        {item && <SiteCatalogItemForm siteId={siteId} toggle={toggle} itemObject={item} setShowAlert={showAlertMessage} />}
      </Modal>
      <Alert toggle={onDismiss} isOpen={visible} className="my-4" color={showAlert.status == 204 ? 'success' : 'danger'}>
        {showAlert.message}
      </Alert>
      <Table responsive hover bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Long</th>
            <th>Merchandise</th>
            <th>Groups</th>
            <th>Price</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {catalog.data.pageContent.map((item) => (
            <tr key={item.item.itemId.itemCode}>
              <th scope="row">{item.item.itemId.itemCode}</th>
              <td>{item.item.shortDescription.values[0].value}</td>
              <td>{item.item.longDescription.values[0].value}</td>
              <td>{item.item.merchandiseCategory.nodeId}</td>
              <td>{item.itemAttributes.groups.length > 0 && item.itemAttributes.groups[0].groupCode}</td>
              <td>{item.itemPrices[0].price}</td>
              <td>
                <Image width={50} height={50} src={item.itemAttributes.imageUrls[0]} />
              </td>
              <td>
                <FontAwesomeIcon key={item.item.itemId.itemCode} icon={faEdit} size="sm" className="pointer" onClick={() => toggle(item)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
