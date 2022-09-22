import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import NotificationItem from '../components/Notifications/NotificationItem'
import { getUserNotifications } from '../src/utils/apis'
const Notifications = ({ userId }) => {

    // const [state, { toggle, setTrue, setFalse }] = useBoolean(true);
    const [visible, setVisible] = React.useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState([])

    useEffect(async () => {
        let notifications = await getUserNotifications(userId)
        setLoading(false)
        setNotifications(notifications)
        return () => {

        }
    }, [])



    return (
        <>
            <Grid columns={1}>
                <Grid.Column>
                    <Checkbox
                        checked={visible}
                        label={{ children: <code>visible</code> }}
                        onChange={(e, data) => setVisible(data.checked)}
                    />
                </Grid.Column>
            </Grid>

            <Sidebar className="side"
                as={Menu}
                animation='push'
                icon='labeled'

                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='very thin'
                direction='right'
            >
                {notifications.map((item, index) => {
                    { console.log("nnn") }
                    return <NotificationItem item={item} />

                })}

            </Sidebar>


            <Sidebar.Pushable as={Segment}>
                <Sidebar.Pusher dimmed={visible}>
                    <div >Application Content</div>
                    {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    )
}
