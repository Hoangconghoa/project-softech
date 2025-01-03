import {
  Form,
  Checkbox,
  Input,
  InputNumber,
  type FormProps,
  Select,
  Button,
  message,
  Row,
  Col,
  Upload,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../librarys/AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import globalConfig from "../../constants/config";
import { AnyObject } from "antd/es/_util/type";
import { TypeProduct } from "../../components/data/type";
const ProductEditPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [updateFormEdit] = Form.useForm();
  const params = useParams();

  const { id } = params;
  console.log(id);
  const getCategories = async () => {
    return axiosClient.get(`/v1/categories`);
  };
  //Lấy danh sách categories về
  const queryCategory = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const getBrands = async () => {
    return axiosClient.get(`/v1/brands?page=1&limit=20`);
  };
  //Lấy danh sách brands về
  const queryBrand = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const getProduct = async () => {
    return axiosClient.get(`/v1/products/${id}`);
  };

  const queryProduct = useQuery({
    queryKey: ["products-detail", id],
    queryFn: getProduct,
  });
  let productData = {};
  if (queryProduct.isSuccess) {
    productData = queryProduct.data.data.data;
    //productData.category = productData.category?._id;
    console.log("productData", productData);
  }
  updateFormEdit.setFieldsValue(productData);

  const queryClient = useQueryClient();
  const fetchUpdate = async (formData: TypeProduct) => {
    return axiosClient.put(`/v1/products/${id}`, formData);
  };

  const mutationUpdate = useMutation({
    mutationFn: fetchUpdate,
    onSuccess: () => {
      console.log("Update success !");
      messageApi.open({
        type: "success",
        content: "Update success !",
      });
      // Làm mới lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      //khi gọi API bị lỗi
      messageApi.open({
        type: "error",
        content: "Update error !",
      });
    },
  });

  const onFinish: FormProps<TypeProduct>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutationUpdate.mutate(values);
    messageApi.open({
      type: "success",
      content: "Update success!",
    });
    navigate("/products");
  };

  const onFinishFailed: FormProps<TypeProduct>["onFinishFailed"] = () => {
    messageApi.open({
      type: "success",
      content: "error",
    });
  };

  return (
    <div>
      {contextHolder}
      <h1>ProductEditPage</h1>
      <Button
        type="primary"
        onClick={() => {
          navigate("/products");
        }}
      >
        Products List
      </Button>
      <Form
        form={updateFormEdit}
        name="edit-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
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
          <Input />
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
              queryCategory.data.data.data.categories.map((e: AnyObject) => {
                return {
                  value: e._id,
                  label: e.categoryName,
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
            { required: false, message: "Please Price" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>

        <Form.Item<TypeProduct>
          hasFeedback
          label="Discount"
          name="discount"
          rules={[
            { required: false, message: "Please discount" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>

        <Form.Item<TypeProduct>
          hasFeedback
          label="Stock"
          name="stock"
          rules={[
            { required: false, message: "Please Stock" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={0} />
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
            { required: false, message: "Please sort" },
            {
              type: "number",
              min: 1,
              message: "Tối thiểu phải là 1",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={50} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Form.Item name="isHome" valuePropName="checked" noStyle>
            <Checkbox>is Home</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Form.Item name="isActive" valuePropName="checked" noStyle>
            <Checkbox>Enable</Checkbox>
          </Form.Item>
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
                /** Upload thành công thì cập nhật lại giá trị input thumbnail */
                if (file.file.status === "done") {
                  updateFormEdit.setFieldValue(
                    "thumbnail",
                    file.file.response.data.link
                  );
                }
              }}
              onRemove={(file) => {
                console.log(file);
                /** Khi xóa hình thì clear giá trị khỏi input */
                updateFormEdit.setFieldValue("thumbnail", null);
                /** Đồng thời gọi API xóa link hình trên server, dựa vào đường dẫn */
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Col>
        </Row>

        <Form.Item hidden label="Id" name="_id">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutationUpdate.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEditPage;
