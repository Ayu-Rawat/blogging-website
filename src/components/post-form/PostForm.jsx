import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './postForm.css'

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);

        try {
            // Ensure user session is refreshed
            const updatedUser = await authService.getCurrentUser();
            if (!updatedUser) {
                console.error("User session not found. Try logging in again.");
                return;
            }

            let file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await appwriteService.createPost({ ...data, userId: updatedUser?.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error during post submission:", error);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap postForm">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    placeholder="Slug"
                    type="hidden"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image or Video :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/webm, video/ogg"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {post.featuredImage && (
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        )}
                        {post.featuredVideo && (
                            <video controls className="rounded-lg">
                                <source src={appwriteService.getFilePreview(post.featuredVideo)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                )}
                <Button type="submit" disabled={loading} bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {loading ? (
                        <span>Loading...</span>
                    ) : post ? (
                        "Update"
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </form>
    );
}
