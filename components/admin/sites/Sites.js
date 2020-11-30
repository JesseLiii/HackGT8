import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTags } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';

function Sites({ data }) {
  const sites = data.data.pageContent;

  const columns = [
    {
      dataField: 'referenceId',
      text: 'Ref ID',
      sort: true,
      headerStyle: {
        width: '100px',
      },
    },
    {
      dataField: 'siteName',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
    },
    {
      dataField: '',
      text: '',
      headerStyle: {
        width: '80px',
      },
      formatter: (rowContent, row) => {
        return (
          <Row className="pr-2">
            <Col sm="6">
              <Link href={`/admin/sites/${row.id}`}>
                <a>
                  <FontAwesomeIcon icon={faEdit} color="darkslategrey" />
                </a>
              </Link>
            </Col>
            <Col sm="6">
              <Link href={`/admin/sites/catalog/${row.id}`}>
                <a>
                  <FontAwesomeIcon icon={faTags} color="darkslategrey" />
                </a>
              </Link>
            </Col>
          </Row>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'id',
      order: 'desc',
    },
  ];
  return (
    <div className="mt-4">
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={sites}
        columns={columns}
        hover
        defaultSorted={defaultSorted}
      />
    </div>
  );
}

export default Sites;
