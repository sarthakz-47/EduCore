import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update.");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return <h1>Profile Loading...</h1>;

  const { user } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="text-2xl font-bold text-center md:text-left">Profile</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-28 w-28 md:h-32 md:w-32">
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
              alt="Profile"
            />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </div>

        {/* User Details */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Name:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {user.name}
            </span>
          </p>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Email:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {user.email}
            </span>
          </p>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Role:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {user.role.toUpperCase()}
            </span>
          </p>

          {/* Edit Profile */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Edit Profile</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile details below and save your changes.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Courses You're Enrolled In</h2>

        {user.enrolledCourses.length === 0 ? (
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {user.enrolledCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
