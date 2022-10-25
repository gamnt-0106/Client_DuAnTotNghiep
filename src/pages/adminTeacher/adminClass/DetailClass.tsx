import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getClassByIdSlide } from '../../../features/Slide/class/classSlice';
import { Table, Typography } from 'antd';
import moment from 'moment';

const DetailClass = props => {
    const {id} = useParams();
      
    const {class: classDeatail} = useSelector((state: any) => state.class)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getClassByIdSlide(id))
    }, [])
    const columns = [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (row, item, index) => `${index + 1}`,
      },
      {
        title: "Name Student",
        dataIndex: "Name Student",
        key: "Name Student",
        render: (row, item) => `${item?.userId?.username}`,
      },
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
        render: (row, item) => `${item?.userId?.email}`,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (row, item) => `${item?.userId?.address}`,
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: (row, item) => `${item?.userId?.phone}`,
      },
      {
        title: "Time Join Class",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (row, item) => `${moment(item?.timeJoinClass).format('DD/MM/YYYY')}`,
      },
    ]
  return (
    <div className="p-2">
    <div className="d-flex align-items-center justify-between">
      <Typography.Title className="m-0 py-4" level={3}>
        Detail Class
      </Typography.Title>
      <Typography.Title className="m-0 py-4" level={3}>
        Name Class: {classDeatail?.nameClass}
      </Typography.Title>
      <Typography.Title className="m-0 py-4" level={3}>
        Link Join Class: {classDeatail?.linkJoinClass}
      </Typography.Title>
    </div>
    <Table dataSource={classDeatail?.userOfClass} columns={columns} />
  </div>
  )
}

DetailClass.propTypes = {}

export default DetailClass