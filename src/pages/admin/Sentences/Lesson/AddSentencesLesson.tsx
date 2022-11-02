/* eslint-disable react/jsx-no-undef */
import {
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  Upload,
  Select,
  Avatar,
  message,
  Modal,
  Progress,
  Image,
  Empty,
  Space,
} from "antd";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import ReactQuill from "react-quill";
import AdminPageHeader from "../../../../components/AdminPageHeader";
import JoditEditor from "jodit-react";
import { addSentences, detailSentences, editSentences } from "../../../../api/sentences";
import '../../../../css/admin/sentences.css'
import { SentenceType } from "../../../../types/sentence";
type Props = {};

const FormSentencesLesson = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [sentences, setSentences] = useState("");
  const { id } = useParams();
  var titlePage: string = "";
  if (id) {
    titlePage = "LUYỆN CẤU TRÚC & CÂU / SỬA BÀI HỌC";
  } else {
    titlePage = "LUYỆN CẤU TRÚC & CÂU / THÊM BÀI HỌC";
  }
  const onFinish = async (value: SentenceType) => {
    const key = "updatable";

    message.loading({ content: "Loading...", key });
    if (id) {
      try {
        await editSentences({
          _id: id,
          practiceActivity: "6346d44a034348adfcfce592",
          words: value.words,
          meaning: value.meaning,
          phoneticTranscription: value.phoneticTranscription,
          structuralAnalysis: value.structuralAnalysis,
          grammarAnalysis: value.grammarAnalysis,
          soundCombinations: value.soundCombinations
        });
        message.success({ content: "Sửa Thành Công!", key, duration: 2 });
        navigate("/admin/sentences/listLesson");
      } catch (error) {
        message.error({ content: "Lỗi", key, duration: 2 });
      }
    } else {
      try {
        await addSentences({
          practiceActivity: "6346d44a034348adfcfce592",
          words: value.words,
          meaning: value.meaning,
          phoneticTranscription: value.phoneticTranscription,
          structuralAnalysis: value.structuralAnalysis,
          grammarAnalysis: value.grammarAnalysis,
          soundCombinations: value.soundCombinations
        });
        message.success({ content: "Thêm Thành Công!", key, duration: 2 });
        navigate("/admin/sentences/addLesson");
      } catch (error) {
        message.error({ content: "Lỗi", key, duration: 2 });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    id
      ? message.error("Sửa Không Thành Công!")
      : message.error("Thêm Không Thành Công!");
  };

  const onReset = () => {
    form.resetFields();
  };

  const getDetail = async () => {
    const { data } = await detailSentences(id);
    setSentences(data);
    form.setFieldsValue({ ...data, test: "default" });
  };

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  const config: any = {
    readonly: false,
    addNewLineOnDBLClick: false,
  };
  return (
    <div className="">
      <AdminPageHeader breadcrumb={titlePage} />
      <div className="">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {id ? (
            <Form.Item label="_id" name="_id" hidden={true}>
              <Input />
            </Form.Item>
          ) : (
            ""
          )}

          <Form.Item
            label="Câu thoại"
            name="words"
            tooltip="Câu thoại"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ý nghĩa"
            name="meaning"
            tooltip="Ý nghĩa"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phiên âm"
            name="phoneticTranscription"
            tooltip="Phiên âm"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Âm và tổ hợp âm cần chú ý luyện tập"
            tooltip="Âm và tổ hợp âm"
            name="test"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <div className="dynamic_form_nest_item">
              <Form.List name="soundCombinations">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          label={'Âm'}
                          name={[name, 'sound']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder="Âm" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label={'Tổ hợp âm'}
                          name={[name, 'combinations']}
                          rules={[{ required: true, message: 'Không để trống' }]}
                          className="combinationsInput"
                        >
                          <Form.List
                            name={[name, 'combinations']}
                          >
                            {(fields, { add, remove }, { errors }) => (
                              <>
                                {fields.map((field, index) => (
                                  <Form.Item
                                    required={false}
                                    key={field.key}
                                    className="inputCombinations"
                                  >
                                    <Form.Item
                                      {...field}
                                      validateTrigger={['onChange', 'onBlur']}
                                      rules={[
                                        {
                                          required: true,
                                          whitespace: true,
                                          message: "Không để trống!",
                                        },
                                      ]}
                                      noStyle
                                    >
                                      <Input placeholder="Tổ hợp âm" style={{ width: '100%', marginBottom: "5px" }} />
                                    </Form.Item>
                                    {fields.length >= 1 ? (
                                      <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)} />

                                    ) : null}
                                  </Form.Item>
                                ))}
                                <Form.Item className="space-x-2 gap-4">
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '100%' }}
                                    className="addCombinations"
                                    icon={<PlusOutlined />}
                                  >
                                    Add field
                                  </Button>
                                  <Form.ErrorList errors={errors} />
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined className="icon-addField" />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </Form.Item>

          <Form.Item
            label="Phân tích cấu trúc"
            name="structuralAnalysis"
            tooltip="Cấu trúc"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <JoditEditor value={sentences} config={config} />
          </Form.Item>

          <Form.Item
            label="Phân tích ngữ pháp"
            name="grammarAnalysis"
            tooltip="Ngữ pháp"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <JoditEditor value={sentences} config={config} />
          </Form.Item>

          <Form.Item className="float-right">
            <Button
              className="inline-block mr-2"
              type="primary"
              htmlType="submit"
            >
              {id ? "Sửa" : "Thêm"}
            </Button>
            <Button
              className="inline-block "
              type="primary"
              danger
              onClick={() => {
                onReset();
              }}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormSentencesLesson;