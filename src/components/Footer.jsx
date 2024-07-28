import React from 'react'

function Footer() {
    return (
        <div className="px-4 py-2 bg-white footer">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                    <a href="#" className='mb-2 mr-3 text-muted'>Terms</a>
                    <a href="#" className='mb-2 mr-3 text-muted'>Policy of use</a>
                </div>
                <small className="text-right d-block pt-2 pb-1 text-muted" >Powered by mitrealaw</small>
            </div>
        </div>
    )
}

export default Footer
