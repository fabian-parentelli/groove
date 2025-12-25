import './footerColumn.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const FooterColumn = ({ data }) => {

    return (
        <div className='footerColumn'>

            <section className='footerColumnPC'>
                <h4>{data.title}</h4>

                <div className='footerColumnText'>
                    {data.content.map((cont, ind) => (
                        <Fragment key={ind}>
                            <Link to={cont.link} style={{ textDecoration: 'none' }}>
                                <p>{cont.text}</p>
                            </Link>
                        </Fragment>
                    ))}
                </div>
            </section>

            <section className='footerColumnPCMobile'>
                <details>
                    <summary>{data.title}</summary>
                    <div className='footerColumnText'>
                        {data.content.map((cont, ind) => (
                            <Fragment key={ind}>
                                <Link to={cont.link} style={{ textDecoration: 'none' }}>
                                    <p>{cont.text}</p>
                                </Link>
                            </Fragment>
                        ))}
                    </div>
                </details>
            </section>

        </div>
    );
};

export default FooterColumn;