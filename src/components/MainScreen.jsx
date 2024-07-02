import React from 'react'
import { Message, Response } from './Chat'
import { CiPaperplane } from "react-icons/ci";

function MainScreen() {
    let message1 = {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, eum.",
        datetime: "1 min ago"
    }

    let message2 = {
        text: "Illo adipisci molestias dolorem reiciendis officiis, nesciunt laborum ratione incidunt, iusto ad at dolores quae modi officia quaerat.",
        datetime: "1 min ago"
    }

    let response1 = {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci molestias dolorem reiciendis officiis, nesciunt laborum ratione incidunt, iusto ad at dolores quae modi officia quaerat. Eum amet tempore doloribus voluptatibus perferendis doloremque neque vero perspiciatis iusto ipsam beatae dolorem, commodi minus similique. Omnis rerum dignissimos repellendus quae natus facere nostrum et atque nobis, ipsam, corrupti quasi, debitis doloribus deserunt.",
        datetime: "2 min ago",
        paginator: true
    }

    let response2 = {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci molestias dolorem reiciendis officiis, nesciunt laborum ratione incidunt, iusto ad at dolores quae modi officia quaerat. Eum amet tempore doloribus voluptatibus perferendis doloremque neque vero perspiciatis iusto ipsam beatae dolorem, commodi minus similique. Omnis rerum dignissimos repellendus quae natus facere nostrum et atque nobis, ipsam, corrupti quasi, debitis doloribus deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo adipisci molestias dolorem reiciendis officiis, nesciunt laborum ratione incidunt, iusto ad at dolores quae modi officia quaerat. Eum amet tempore doloribus voluptatibus perferendis doloremque neque vero perspiciatis iusto ipsam beatae dolorem, commodi minus similique. Omnis rerum dignissimos repellendus quae natus facere nostrum et atque nobis, ipsam, corrupti quasi, debitis doloribus deserunt.",
        datetime: "3 min ago"
    }


    return (
        <div className='mainscreen flex-grow-1 position-relative pb-0'>

            <div className="question">
                <div className=" border rounded d-flex align-items-center sec-bg p-3 shadow-sm ">
                    <input type="text" className="question-input w-100 h-100 border-0" placeholder='Ask questions or type "/" for commands' />
                    <CiPaperplane className="question-icon" size={40}/>
                </div>
                <div className="box"></div>
            </div>


            <div className="chats">
                <Message {...message1} />
                <Response {...response1} />
                <Message {...message2} />
                <Response {...response2} />
                <Response {...response2} />
            </div>

        </div>
    )
}

export default MainScreen
