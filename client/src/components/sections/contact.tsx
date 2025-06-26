import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [projectType, setProjectType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset();
      setProjectType("");
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="bg-warm-yellow py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            Let's connect
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Always excited to discuss ideas, collaborate on projects, or just chat about technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-900 font-medium">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    className="mt-2 bg-white/80 border-gray-200 rounded-xl"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className="mt-2 bg-white/80 border-gray-200 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="projectType" className="text-gray-900 font-medium">What's on your mind?</Label>
                  <Select
                    value={projectType}
                    onValueChange={(value) => {
                      setProjectType(value);
                      setValue("projectType", value);
                    }}
                  >
                    <SelectTrigger className="mt-2 bg-white/80 border-gray-200 rounded-xl">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="freelance">Freelance Project</SelectItem>
                      <SelectItem value="mentorship">Mentorship</SelectItem>
                      <SelectItem value="chat">Just Saying Hi</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-900 font-medium">Message</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    placeholder="Tell me about your project or idea..."
                    className="mt-2 bg-white/80 border-gray-200 rounded-xl"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-xl py-4 text-lg font-medium transition-all hover:scale-105"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-terracotta rounded-2xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">Email</div>
                  <div className="text-gray-600">prabinthakur0101@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-sage rounded-2xl flex items-center justify-center">
                  <Github className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">GitHub</div>
                  <div className="text-gray-600">@pluto-111</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center">
                  <Linkedin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">LinkedIn</div>
                  <div className="text-gray-600">Prabin Thakur</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#8BA0AF" }}>
                  <Twitter className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">X (Twitter) </div>
                  <div className="text-gray-600">@Prab1n_</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mostly online,tho usually Respond Late</h3>
              <p className="text-gray-700 leading-relaxed">
                 typically respond before you take two cosecutive poops . If it's urgent or you want to donate 
                 sent the hand-written letter  via a bird called email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
