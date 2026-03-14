import {Modal, Descriptions} from 'antd'

function ViewModal({ open, data, fields, title, onClose}) {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Descriptions column={1} bordered>
                {fields.map(({ label, key, render }) => (
                    <Descriptions.Item key={key} label={label}>
                        {render ? render(data?.[key], data) : data?.[key] ?? '-'}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        </Modal>
    )
}
export default ViewModal