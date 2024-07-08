import React from 'react'
import Pin from '../images/Pin.png'
import ActiveChat from '../images/ActiveChat.png'


function History({ title, body, active, pinned, datetime }) {
	return (
		<div className={`chat-history d-flex align-items-start ${active && "active-history"}`}>
			<div className='history-icon mr-2'>
				{
					active ? <img src={ActiveChat} alt="" />
						: pinned ? <img src={Pin} alt="" />
							: <span className='mr-3'></span>
				}
			</div>
			<div>
				<div className="chat-heading mb-2 d-flex align-items-center justify-content-between">
					<p className='m-0 font-weight-bold'>{title}</p>
					<div>{datetime}</div>
				</div>
				<p>{body}</p>
			</div>

		</div>
	)
}

export default History
