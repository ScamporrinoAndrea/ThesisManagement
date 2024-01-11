import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, Button } from 'react-bootstrap'
import API from '../API'
import PropTypes from 'prop-types'
import { useLoading } from '../LoadingContext';
import Loading from '../components/Loading.jsx';
import SecretaryCard from '../components/SecretaryCard.jsx';

const SecretaryHome = ({ handleError,
    handleSuccess,
    accessToken,
    setShowModal,
    setMsgModal }) => {

    const { loading, setLoading } = useLoading();
    const [rapidFilter, setRapidFilter] = useState('secretary-review');
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [requests, setRequests] = useState([]); // 0 pending, 1 accepted by secretary, 2 rejected by secretary, 3 accepted by professor, 4 rejected by professor, 5 request change
    const [internalDirty, setInternalDirty] = useState(false);
    useEffect(() => {
        if (accessToken != null) {
            setLoading(true);
            API.getStudentThesisRequest(accessToken)
                .then((requests) => {
                    console.log(requests);
                    setRequests(requests);
                    setFilteredRequests(requests);
                    setLoading(false);
                    setInternalDirty(false);
                })
                .catch((err) => {
                    handleError(err.message);
                    setLoading(false);
                    setInternalDirty(false);
                });
        }
    }, [accessToken, internalDirty])

    useEffect(() => {
        if (requests.length != 0) {
            if (rapidFilter === 'secretary-review') {
                setFilteredRequests(requests.filter((request) => request.status == 0));
            } else if (rapidFilter === 'supervisor-review') {
                setFilteredRequests(requests.filter((request) => request.status == 1));
            } else if (rapidFilter === 'accepted') {
                setFilteredRequests(requests.filter((request) => request.status == 3));
            } else if (rapidFilter === 'rejected') {
                setFilteredRequests(requests.filter((request) => request.status == 2 || request.status == 4));
            } else if (rapidFilter === 'requested-change') {
                setFilteredRequests(requests.filter((request) => request.status == 5));
            }
        }
    }, [rapidFilter, requests])

    return loading ? (
        <Loading />
    ) : (
        <>
            <div style={{ position: 'sticky', top: 0, zIndex: 2, backgroundColor: 'white', boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)' }}>
                <Container>
                    <Row style={{ paddingTop: 25, paddingBottom: 10 }}>
                        <Col md='auto' style={{ paddingBottom: 10, overflowX: 'auto' }}>
                            <Nav variant='pills' activeKey={rapidFilter} style={{ display: 'flex', flexWrap: 'nowrap' }}>
                                <Nav.Item>
                                    <Nav.Link eventKey='secretary-review' style={{ width: 193 }} className='buttons-rapid-filter' onClick={() => setRapidFilter('secretary-review')}>
                                        In review by secretary
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='supervisor-review' style={{ width: 201 }} className='buttons-rapid-filter' onClick={() => setRapidFilter('supervisor-review')}>
                                        In review by supervisor
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='requested-change' style={{ width: 170 }} className='buttons-rapid-filter' onClick={() => setRapidFilter('requested-change')}>
                                        Requested change
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='accepted' className='buttons-rapid-filter' onClick={() => setRapidFilter('accepted')}>
                                        Accepted
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='rejected' className='buttons-rapid-filter' onClick={() => setRapidFilter('rejected')}>
                                        Rejected
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row style={{ marginBottom: 25 }}>
                    {filteredRequests.length != 0 ? (
                        filteredRequests.map((request) => (
                            <SecretaryCard
                                key={request.id} a
                                accessToken={accessToken}
                                request={request}
                                setInternalDirty={setInternalDirty}
                                handleError={handleError}
                                handleSuccess={handleSuccess}
                                setShowModal={setShowModal}
                                setMsgModal={setMsgModal}
                                isProfessor={false}
                            />
                        ))) : (
                        <Col style={{ marginTop: 25 }}>
                            <p>No request to display</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    )
}

SecretaryHome.propTypes = {
    handleError: PropTypes.func.isRequired,
    handleSuccess: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
    setShowModal: PropTypes.func.isRequired,
    setMsgModal: PropTypes.func.isRequired,
};

export default SecretaryHome;