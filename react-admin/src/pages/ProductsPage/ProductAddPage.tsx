import {
  Form,
  Checkbox,
  Input,
  InputNumber,
  Select,
  Button,
  message,
  Row,
  Col,
  Upload,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../librarys/AxiosClient";
import { useNavigate } from "react-router-dom";
import { TypeProduct } from "../../components/data/type";
import globalConfig from "../../constants/config";
import { UploadOutlined } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";

const ProductAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [updateFormEdit] = Form.useForm();

  const getCategories = async () => {
    return axiosClient.get(`/v1/categories`);
  };

  const queryCategory = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const getBrands = async () => {
    return await axiosClient.get(`/v1/brands?page=1&limit=20`);
  };

  const queryBrand = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const queryClient = useQueryClient();
  const fetchCreate = async (formData: TypeProduct) => {
    console.log(formData);
    return axiosClient.post("/v1/products", formData);
  };

  const mutationCreate = useMutation({
    mutationFn: fetchCreate,
    onSuccess: () => {
      console.log("Create success !");
      messageApi.open({
        type: "success",
        content: "Create success !",
      });
      // Làm mới lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      updateFormEdit.resetFields();
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Create error !",
      });
    },
  });

  const onFinish = (values: TypeProduct) => {
    console.log("Success:", values);
    mutationCreate.mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const FormatNumber = (value: any) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const toSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD") // Chuẩn hóa chuỗi để tách dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
      .replace(/[^a-z0-9\s-]/g, "") // Xóa các ký tự không hợp lệ
      .trim() // Xóa khoảng trắng đầu cuối
      .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu gạch ngang
  };
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormEdit.setFieldsValue({
      productName: value,
      slug: toSlug(value),
    });
  };

  return (
    <div>
      {contextHolder}
      <h1>ProductAddPage</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            navigate("/products");
          }}
        >
          Products List
        </Button>
      </div>
      <Form
        form={updateFormEdit}
        name="create-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          price: 0,
          discount: 0,
          stock: 0,
          sort: 50,
          isActive: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<TypeProduct>
          label="Product Name"
          name="productName"
          rules={[
            { required: true, message: "Please input product Name!" },
            { min: 4, message: "Tối thiểu 4 kí tự" },
          ]}
        >
          <Input onChange={handleProductNameChange} />
        </Form.Item>
        <Form.Item<TypeProduct>
          label="URL SEO"
          name="slug"
          rules={[
            { required: true, message: "Please input product slug!" },
            { min: 4, message: "Tối thiểu 4 kí tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<TypeProduct>
          label="Category"
          name="category"
          rules={[
            { required: true, message: "Please input product Category!" },
          ]}
        >
          <Select
            style={{ width: 120 }}
            onChange={() => {}}
            options={
              queryCategory.data &&
              queryCategory.data.data.data.categories.map((c: AnyObject) => {
                return {
                  value: c._id,
                  label: c.categoryName,
                };
              })
            }
          />
        </Form.Item>
        <Form.Item<TypeProduct>
          label="Brand"
          name="brandId"
          rules={[{ required: true, message: "Please input product Brand!" }]}
        >
          <Select
            style={{ width: 120 }}
            onChange={() => {}}
            options={
              queryBrand.data &&
              queryBrand.data.data.data.brands.map((c: AnyObject) => {
                return {
                  value: c._id,
                  label: c.brandName,
                };
              })
            }
          />
        </Form.Item>
        <Form.Item<TypeProduct>
          hasFeedback
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input price" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber
            formatter={(value) => FormatNumber(value)}
            parser={(value: any) => value.replace(/\./g, "")}
            min={0}
            style={{ width: "20%" }}
          />
        </Form.Item>
        <Form.Item<TypeProduct>
          hasFeedback
          label="Discount"
          name="discount"
          rules={[
            { required: false, message: "Please input discount" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber
            min={0}
            formatter={(value) => `${value}%`}
            parser={(value: any) => value.replace("%", "")}
          />
        </Form.Item>
        <Form.Item<TypeProduct>
          label="Description"
          name="description"
          rules={[{ max: 500, message: "Tối đa 500 kí tự" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item<TypeProduct>
          hasFeedback
          label="Sort"
          name="sort"
          rules={[
            { required: false, message: "Please input sort" },
            {
              type: "number",
              min: 1,
              message: "Tối thiểu phải là 1",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item<TypeProduct> label="Thumbnail" name="thumbnail">
          <Input />
        </Form.Item>
        <Row style={{ margin: "20px 0" }}>
          <Col offset={4}>
            <Upload
              action={`${globalConfig.urlAPI}/v1/upload/single`}
              listType="picture"
              onChange={(file) => {
                console.log(file, file.file.status);
                if (file.file.status === "done") {
                  updateFormEdit.setFieldValue(
                    "thumbnail",
                    file.file.response.data.link
                  );
                }
              }}
              onRemove={(file) => {
                console.log(file);
                updateFormEdit.setFieldValue("thumbnail", null);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Form.Item name="isHome" valuePropName="checked">
            <Checkbox>Hiển thị ở trang chủ</Checkbox>
          </Form.Item>
          <Form.Item name="isHot" valuePropName="checked">
            <Checkbox>Sản phẩm HotDeal</Checkbox>
          </Form.Item>
          <Form.Item name="isActive" valuePropName="checked">
            <Checkbox checked={true} defaultChecked={true}>
              Enable
            </Checkbox>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutationCreate.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAddPage;
