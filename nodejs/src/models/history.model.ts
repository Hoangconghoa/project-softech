import { Schema, model } from "mongoose";
import { IProduct, ProductModelType } from "../types/models";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import buildSlug from "../helpers/slugHepers";

const historySchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Yeu cau dien historyName"],
      unique: [true, "historyName khong the trung lap"],
    },
    /**
     * QUAN HỆ ONE-ONE
     * 1 SP thuộc 1 Danh mục
     */
    category: {
      type: Schema.Types.ObjectId, //_id
      ref: "Category",
      required: true,
    },
    brandId: {
      type: Schema.Types.ObjectId, //_id
      ref: "Brand",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    modelYear: {
      type: String,
      maxLength: 4,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
      maxLength: 500,
    },
    slug: {
      type: String,
      required: false,
      lowercase: true,
      unique: true,
      max: 255,
      validate: {
        validator: function (value: string) {
          const slugRegex = /^[a-z0-9\-]+$/;
          return slugRegex.test(value);
        },
        message:
          "Slug must be unique and contain only letters, numbers, and hyphens",
      },
    },
    sort: {
      type: Number,
      default: 50,
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
      enum: ["true", "false"],
    },
    isDelete: {
      type: Boolean,
      default: false,
      enum: ["true", "false"],
    },
    isBest: {
      type: Boolean,
      default: false,
      enum: ["true", "false"],
    },
    isNew: {
      type: Boolean,
      default: false,
      enum: ["true", "false"],
    },
    isHot: {
      type: Boolean,
      default: false,
      enum: ["true", "false"],
    },
    isHome: {
      type: Boolean,
      default: false,
      enum: ["true", "false"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/* Khai báo khóa ngoại với Category Model */
historySchema.virtual("brand", {
  ref: "Brand",
  localField: "brandId",
  foreignField: "_id",
  justOne: true,
});

historySchema.set("toJSON", { virtuals: true });
// Virtuals in console.log()
historySchema.set("toObject", { virtuals: true });
//dùng cái này cho hiệu suất join nhanh hơn
//khi dùng thằng này
//.lean({virtuals: true})
historySchema.plugin(mongooseLeanVirtuals);

//Đăng ký một trường ảo
historySchema.virtual("url").get(function () {
  return "/historys/" + this._id;
});

//Middleware
historySchema.pre("save", async function (next) {
  /**
   * Tự động tạo slug khi slug ko được truyền
   * hoặc slug = ''
   */
  const now = new Date();
  const gio = now.getHours().toString().padStart(2, "0");
  const phut = now.getMinutes().toString().padStart(2, "0");
  const giay = now.getSeconds().toString().padStart(2, "0");
  this.time = `${gio}:${phut}:${giay}`;
  //   if (this.slug == "" || !this.slug) {
  //     this.slug = buildSlug(this.productName);
  //   }
  next();
});

const history = model<IProduct, ProductModelType>("history", historySchema);
export default history;
