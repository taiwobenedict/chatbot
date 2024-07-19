import React, { useContext } from 'react'
import ActiveChat from '../images/ActiveChat.png'
import SlowText from './TextAnimation'
import { chatContext } from '../context/ChatContext'


function History({ id, title, body, active, datetime }) {
	const { fetchAllMessages, dispatch, user } = useContext(chatContext)

	const displayMessage =(e) => {

		fetchAllMessages(user.id, e.target.id)
		dispatch({
			type: "set_active",
			payload: e.target.id
		})
		
	}



	return (
		<div className={`chat-history d-flex align-items-start w-100 ${active && "active-history"} position-relative`}>
			<div className='history-icon mr-2'>
				{ 
					active ? <img src={ActiveChat} alt="" /> : <span className='mr-3'></span>
				}
			</div>
			<div>
				<div className="chat-heading history-heading mb-2 d-flex align-items-center justify-content-between w-100">
					<div className='m-0 font-weight-bold'><SlowText text={title} speed={20}  markdown={false} /></div>
					<div>{datetime}</div>
				</div>
				<div className='m-0'><SlowText text={body} speed={50}/></div>
			</div>
				<div className="chat-cover"  id={id}  onClick={displayMessage}></div>
		</div>
	)
}

export default History
