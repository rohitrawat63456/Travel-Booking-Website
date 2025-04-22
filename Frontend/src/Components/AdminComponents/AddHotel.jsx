import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
export const AddHotel = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Add a New Hotel
      </h2>
      <Form method="POST" encType="multipart/form-data" className="space-y-4">
        <div>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hotel name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium">
              Price per Night (in ₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-gray-700 font-medium">
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter rating"
              min="1"
              max="5"
              required
            />
          </div>

          <div>
            <label
              htmlFor="parking"
              className="block text-gray-700 font-medium"
            >
              Parking
            </label>
            <input
              type="text"
              id="parking"
              name="parking"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Yes or No"
              required
            />
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="block text-gray-700 font-medium"
            >
              capacity
            </label>
            <input
              type="Number"
              id="capacity"
              name="capacity"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Number of person per room"
              required
            />
          </div>

          <div>
            <label htmlFor="wifi" className="block text-gray-700 font-medium">
              wifi
            </label>
            <input
              type="text"
              id="wifi"
              name="wifi"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="is Wifi Facilty available"
              required
            />
          </div>
          <label htmlFor="imageUrl" className="block text-gray-700 font-medium">
            Add Hotel Image
          </label>
          <input
            type="file"
            id="imageUrl"
            name="image"
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Hotel
        </button>
      </Form>
    </div>
  );
};

export async function PostAddHotelAction(data) {
  try {
    const formData = await data.request.formData();
    const response = await fetch("http://localhost:8000/admin/add-hotel", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      toast.success("Hotel added successfully!");
      return redirect("/admin/home");
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error("Error in adding hotel", error.message);
  }
}
