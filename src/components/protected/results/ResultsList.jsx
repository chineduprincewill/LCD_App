import React, { Fragment } from 'react'
import Result from './Result'
import Mresult from './Mresult'

const ResultsList = ({ rslts, view}) => {

    return (
        view === 'web' ? 
        <tbody>
            {rslts !== null && rslts.map((rslt, index) => {
                return (
                    <Result rslt={rslt} position={index + 1} key={index} />
                )
            })}
        </tbody> 
        :
        <Fragment>
            {rslts !== null && rslts.map((rslt, index) => {
                return (          
                    <Mresult rslt={rslt} position={index + 1} key={index} />
                )
            })}
        </Fragment>
    )
}

export default ResultsList
