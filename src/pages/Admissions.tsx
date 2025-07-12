import { useState } from "react";
import {CheckCircle, FileText, CreditCard, UserCheck, Calendar, Phone, Mail, User,} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Admissions = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    level: "",
    message: "",
  });

  const courses = [
    { value: "btech-cse", label: "B.Tech Computer Science", level: "UG" },
    {
      value: "btech-mech",
      label: "B.Tech Mechanical Engineering",
      level: "UG",
    },
    { value: "bca", label: "BCA (Computer Applications)", level: "UG" },
    { value: "bba", label: "BBA (Business Administration)", level: "UG" },
    {
      value: "bsc-hospitality",
      label: "B.Sc in Hospitality Studies",
      level: "UG",
    },
    { value: "mba", label: "MBA – General Management", level: "PG" },
    { value: "mca", label: "MCA (Computer Applications)", level: "PG" },
    { value: "mtech-cse", label: "M.Tech in Computer Science", level: "PG" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (value) => {
    const selected = courses.find((c) => c.value === value);
    setFormData((prev) => ({
      ...prev,
      course: value,
      level: selected?.level || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for applying. We will get back to you shortly.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      course: "",
      level: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Apply Now</h2>
          <p className="text-xl text-gray-600">
            Fill out the form below to start your application process.
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Application Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>



              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="course">Select Course</Label>
                <Select onValueChange={handleCourseChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.level && (
                <div>
                  <Label>Course Level</Label>
                  <Input disabled value={formData.level} />
                </div>
              )}
              <div>
                <Label htmlFor="message">Personal Statement</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're applying..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Admissions;
