import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Repository = () => {
    const [data, setData] = useState({})
    const slug = window.location.href.replace('http://localhost:3000/', '')
    const fetchData = () => {
        axios.get(`https://api.github.com/repos/${slug}`, {
            headers: {
                auth: process.env.TOKEN
            }
        }).then(res => setData(res.data))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="container custom-container">
            <div className="row custom-card">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={data?.owner?.avatar_url} />
                    <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>
                            <span>Full Owner Name: <strong><a href={data?.html_url} target="_blank">{data?.owner?.login}</a></strong></span><br />
                            <span>Repository name: <strong><a href={data?.html_url} target="_blank">{data?.full_name}</a></strong></span><br />
                            <span>Number of open issues: <strong>{data?.open_issues}</strong></span><br />
                            <span>Default Branch: <strong>{data?.default_branch}</strong></span><br />
                        </Card.Text>
                        <Button variant="primary"><a href="/" style={{ textDecoration: "none", color: "white" }}>Back</a></Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Repository;